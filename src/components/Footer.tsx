export default function Footer() {
    return(
        <footer className="bg-gray-800 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} EShop. All rights reserved.</p>
                <p>Follow us on 
                    <a href="https://twitter.com" className="text-blue-400 hover:underline"> Twitter</a>, 
                    <a href="https://facebook.com" className="text-blue-400 hover:underline"> Facebook</a>, and 
                    <a href="https://instagram.com" className="text-blue-400 hover:underline"> Instagram</a>.
                </p>
            </div>
        </footer>
    )
}