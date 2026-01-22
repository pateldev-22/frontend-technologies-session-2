import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon,SunIcon,MoonIcon, XMarkIcon,ShoppingCartIcon } from '@heroicons/react/24/outline'
import { href, NavLink, useNavigate } from 'react-router-dom';

const navigation = [
  {name:"Home" , href:"",current:true},
  { name: 'products', href: 'products', current: false },
  { name: 'cart', href: 'cart', current: false },
  { name: 'About', href: '/About', current: false },
]


export default function Navbar() {
  const context = useTheme();
  console.log(context);
  const navigate = useNavigate();
  const {cart} = useCart();

  const total_quantity = cart.reduce(
    (sum:number, curr:any) => sum + curr.quantity,
    0
  )

  const navLinkClass = ({ isActive } : any) =>
    `px-4 py-2 rounded transition-colors duration-200 ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <Disclosure
      as="nav"
      className="relative bg-green-500 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 text-white ">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={navLinkClass}
                  >
                    {item.name}
                  </NavLink>
                ))}
                <button
                  onClick={() => navigate('/cart')}
                  className="fixed top-3 right-14 gap-2 p-2.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  {total_quantity > 0 && (
                      <span className='absolute -top-1 -right-1 bg-red-600 text-xs px-2 rounded-full'>{total_quantity}</span>
                  )}
                </button>
                <button
                  onClick={context?.toggleTheme}
                  aria-label={`Switch to ${context?.theme === "dark" ? "light" : "dark"} mode`}
                  className={`fixed top-3 right-5 p-2 rounded transition-colors duration-300 
                    ${context?.theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}
                >
                  {context?.theme === "dark" ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="flex flex-col space-y-2 px-4 pb-4 pt-2 bg-green-500 text-white ">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              
            >
              {item.name}
            </DisclosureButton>
          ))}
          <button onClick={context?.toggleTheme} className='fixed bg-red-400 top-5 text-white p-2 rounded'>
                  {context?.theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                </button>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
