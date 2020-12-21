import Link from 'next/link'

const links = [
  { href: 'https://github.com/vercel/next.js', label: 'GitHub' },
  { href: 'https://nextjs.org/docs', label: 'Docs' },
]

export default function Nav() {
  return (
    <nav>
      <ul className="bg-grey-light flex items-center justify-around p-8">
        <li>
          <Link href="/">
            <a className="text-blue-500 no-underline text-accent-1 dark:text-blue-300">
              Clientes
            </a>
          </Link>
        </li>
        <li>
          <Link href="/provider">
            <a className="text-blue-500 no-underline text-accent-1 dark:text-blue-300">
              Fornecedores
            </a>
          </Link>
        </li>
        <li>
          <Link href="/device">
            <a className="text-blue-500 no-underline text-accent-1 dark:text-blue-300">
              Aparelhos
            </a>
          </Link>
        </li>
        <li>
          <Link href="/iptvapp">
            <a className="text-blue-500 no-underline text-accent-1 dark:text-blue-300">
              Aplicativos
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
