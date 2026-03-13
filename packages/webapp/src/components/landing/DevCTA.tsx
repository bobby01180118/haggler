import { Link } from 'react-router-dom'
import { Github, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DevCTA() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-indigo-600 px-8 py-14 sm:px-14 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Build with Haggler
          </h2>
          <p className="text-indigo-200 text-lg mb-8 max-w-xl mx-auto">
            <code className="bg-indigo-500/30 px-2 py-0.5 rounded text-indigo-100 text-sm font-mono">npx @haggler/mcp-server</code>
            {' '}— or add it to your MCP config in 30 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/bobby01180118/haggler"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-600 font-semibold rounded-full transition-all duration-200 text-base hover:bg-indigo-50 shadow-lg"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
            <Link
              to="/trade"
              className="group flex items-center gap-2 px-8 py-3.5 bg-indigo-500 hover:bg-indigo-400 text-white font-medium rounded-full transition-all duration-200 text-base border border-indigo-400/30"
            >
              Try the Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
