import postgres from 'postgres';
import {
  ProductField,
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  Product,
} from './definitions';
import { formatCurrency } from './utils';
const ITEMS_PER_PAGE = 10;
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
export async function fetchAllInvoices() {
  try {
    const invoices = await sql`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name AS customer_name,
        customers.email AS customer_email,
        customers.image_url AS customer_image
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 20
    `;

    // Format amount ke rupiah
    return invoices.map((invoice) => ({
      ...invoice,
      amount: Number(invoice.amount) / 100, // contoh konversi dari cents ke rupiah
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw[]>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 3`;

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0][0].count ?? '0');
    const numberOfCustomers = Number(data[1][0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}


export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
): Promise<InvoicesTable[]> {
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const minItemsPerPage = Math.max(ITEMS_PER_PAGE, 10);

    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        invoices.quantity, -- langsung ambil dari tabel invoices
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY 
        invoices.id DESC,
        invoices.date DESC
      LIMIT ${minItemsPerPage} OFFSET ${offset};
    `;

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}



export async function fetchInvoicesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchFilteredProducts(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const products = await sql<ProductField[]>`
      SELECT
        id_produk,
        nama_produk,
        harga,
        stok,
        foto,
        deskripsi
      FROM products
      WHERE
        nama_produk ILIKE ${`%${query}%`} OR
        deskripsi ILIKE ${`%${query}%`}
      ORDER BY nama_produk ASC
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset};
    `;

    return products;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered products.');
  }
}


export async function fetchProductsPages(query: string) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM products
      WHERE
        nama_produk ILIKE ${`%${query}%`} OR
        deskripsi ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType[]>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchProducts(query: string = '') {
  try {
    const products = await sql<Product[]>`
      SELECT
        id_produk,
        nama_produk,
        harga,
        stok,
        foto,
        deskripsi
      FROM products
      WHERE LOWER(nama_produk) LIKE ${'%' + query.toLowerCase() + '%'}
      ORDER BY nama_produk ASC
    `;

    return products;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

// Ambil 1 produk berdasarkan ID
export async function fetchProductById(id: string) {
  try {
    const data = await sql<ProductField[]>`
      SELECT
        id_produk,
        nama_produk,
        harga,
        stok,
        foto,
        deskripsi
      FROM products
      WHERE id_produk = ${id}::uuid
    `;

    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function fetchMostSoldProducts() {
  try {
    const products = await sql<any[]>`
      SELECT 
        p.id_produk,
        p.nama_produk,
        p.harga,
        p.stok,
        p.foto,
        p.deskripsi,
        SUM(ii.quantity) AS quantity
      FROM products p
      JOIN invoice_items ii ON p.id_produk = ii.product_id
      GROUP BY p.id_produk, p.nama_produk, p.harga, p.stok, p.foto, p.deskripsi
      ORDER BY quantity DESC
      LIMIT 3;
    `;

    return products.map(product => ({
      ...product,
      quantity: Number(product.quantity),
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch most sold products.');
  }
}






// Tambahkan produk baru
export async function createProduct(product: {
  nama_produk: string;
  harga: number;
  stok: number;
  foto: string;
  deskripsi: string;
}) {
  try {
    const result = await sql<Product[]>`
      INSERT INTO products (nama_produk, harga, stok, foto, deskripsi)
      VALUES (${product.nama_produk}, ${product.harga}, ${product.stok}, ${product.foto}, ${product.deskripsi})
      RETURNING *
    `;

    return result[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create product.');
  }
}

// Hapus produk berdasarkan ID
export async function deleteProductById(id: string) {
  try {
    await sql`DELETE FROM products WHERE id_produk = ${id}::uuid`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete product.');
  }
}

export async function fetchInvoices(page: number, query: string = '') {
  const offset = (page - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql`
      SELECT invoices.*, customers.name AS customer_name, customers.email
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${'%' + query + '%'} OR
        customers.email ILIKE ${'%' + query + '%'} OR
        invoices.amount::text ILIKE ${'%' + query + '%'} OR
        invoices.date::text ILIKE ${'%' + query + '%'} OR
        invoices.status ILIKE ${'%' + query + '%'}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE}
      OFFSET ${offset}
    `;
    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchTopProducts() {
  try {
    const products = await sql<Product[]>`
      SELECT
        id_produk,
        nama_produk,
        harga,
        stok,
        foto,
        deskripsi
      FROM products
      ORDER BY stok DESC
      LIMIT 3
    `;
    return products;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch top products.');
  }
}
