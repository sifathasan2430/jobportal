export default function AdminLayout({ children }){
  return (
    <div className="admin-container">
           <main>{children}</main>
    </div>
  )
}