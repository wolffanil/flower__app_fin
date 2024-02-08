import AddProduct from "@/components/forms/addProduct/AddProduct";

export const metadata = {
  title: 'Админ',
  description: 'Админ панель',
  robots: {
    index: false,
    nocache: true
  }
  
}

function AdminPage() {
  return <AddProduct />;
}

export default AdminPage;
