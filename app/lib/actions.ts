'use server';
import { ZodString, z } from 'zod';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
import { redirect } from 'next/navigation';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
  quantity: z.string().transform((val) => parseInt(val, 10)),
  id_produk: z.string(), // ubah dari nama_produk
});



const FormSchemaproduct = z.object({
  nama_produk: z.string(),
  harga: z.coerce.number(),
  stok: z.string().transform((val) => parseInt(val, 10)),
  deskripsi: z.string(),
  foto: z
    .string()
    .refine((val) => val.startsWith('/') || /^https?:\/\//.test(val), {
      message: 'Masukkan URL gambar yang valid (misal: /map.png atau https://...)',
    }),
});


const CreateProduct = FormSchemaproduct;

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  try {
    const { customerId, amount, status, quantity, id_produk} = CreateInvoice.parse({
      id_produk: formData.get('product_id')?.toString() ?? '',
      customerId: formData.get('customerId')?.toString() ?? '',
      amount: formData.get('amount'),
      status: formData.get('status'),
      quantity: formData.get('quantity'),
    });

    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql`
      INSERT INTO invoices (customer_id, amount, status, date, quantity, id_produk)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date}, ${quantity}, ${id_produk})
    `;

    revalidatePath('/Admin/Transaction');
    redirect('/Admin/Transaction');
  } catch (error) {
    console.error('🔥 Error in createInvoice:', error);
    throw error;
  }
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/Admin/transaction'); // ganti sesuai path page kamu
}


export async function createProduct(formData: FormData) {
  try {
    const rawFoto = formData.get('foto');
    const validatedFields = CreateProduct.parse({
      nama_produk: formData.get('nama_produk'),
      harga: formData.get('harga'),
      stok: formData.get('stok'),
      deskripsi: formData.get('deskripsi'),
      foto: formData.get('foto'), 
    });

    const { nama_produk, harga, stok, deskripsi, foto } = validatedFields;
    
    // Convert harga to cents (if needed) or keep as is
    const hargaInCents = harga * 100;

    await sql`
      INSERT INTO products (nama_produk, harga, stok, deskripsi, foto)
      VALUES (${nama_produk}, ${hargaInCents}, ${stok}, ${deskripsi}, ${foto})
    `;

    // revalidatePath('/Admin/Product-ad');
    // redirect('/Admin/Product-ad');
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
}




export async function deleteProduct(id_produk: string) {
  await sql`DELETE FROM products WHERE id_produk = ${id_produk}`;
  revalidatePath('/Admin/Product-ad'); // ganti sesuai path page kamu
}

export async function editProduct(id: string, formData: FormData) {
  try {
    const rawFoto = formData.get('foto');
    const validatedFields = CreateProduct.parse({
      nama_produk: formData.get('nama_produk'),
      harga: formData.get('harga'),
      stok: formData.get('stok'),
      deskripsi: formData.get('deskripsi'),
      foto: formData.get('foto'), 
    });
    const { nama_produk, harga, stok, deskripsi, foto } = validatedFields;
    
    // Convert harga to cents (if needed) or keep as is
    const hargaInCents = harga * 100;
    
    await sql`
      UPDATE products 
      SET nama_produk = ${nama_produk}, 
          harga = ${hargaInCents}, 
          stok = ${stok}, 
          deskripsi = ${deskripsi}, 
          foto = ${foto}
      WHERE id_produk = ${id}
    `;
    
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}