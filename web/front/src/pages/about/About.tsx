import PageContainer from '../shared/components/PageContainer'
import { Zap, Shield, Globe, BrainCircuit } from 'lucide-react'

function About() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-8 w-full max-w-[800px] mx-auto pb-8 overflow-auto">
        <div className="text-center py-8">
          <h1 className="text-[2.5rem] font-extrabold mb-4 bg-gradient-to-br from-gray-800 to-status-info bg-clip-text text-transparent">
            L'information, simplifiée.
          </h1>
          <p className="text-xl text-gray-800 opacity-80 max-w-[600px] mx-auto leading-relaxed">
            Havite utilise l'intelligence artificielle pour vous offrir des
            résumés d'actualités clairs, concis et impartiaux.
          </p>
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="text-[1.75rem] font-bold text-gray-900 border-b-2 border-gray-400 pb-2">
            Notre Mission
          </h2>
          <p className="text-lg leading-relaxed text-gray-800">
            Dans un monde saturé d'informations, il devient difficile de
            distinguer l'essentiel du bruit. Notre mission est de redonner le
            pouvoir aux lecteurs en leur fournissant des synthèses intelligentes
            de l'actualité, sourcées et vérifiées, pour comprendre le monde en
            un coup d'œil.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-[1.75rem] font-bold text-gray-900 border-b-2 border-gray-400 pb-2">
            Pourquoi Havite ?
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 mt-4">
            <div className="bg-gray-200 p-6 rounded-2xl border border-gray-300 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-gray-400">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 flex items-center gap-2">
                <Zap size={24} color="#F59E0B" /> Rapidité
              </h3>
              <p className="text-base text-gray-800 opacity-90">
                Accédez à l'essentiel de l'information en quelques secondes
                grâce à nos résumés générés en temps réel.
              </p>
            </div>
            <div className="bg-gray-200 p-6 rounded-2xl border border-gray-300 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-gray-400">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 flex items-center gap-2">
                <BrainCircuit size={24} color="#8B5CF6" /> IA Avancée
              </h3>
              <p className="text-base text-gray-800 opacity-90">
                Nos algorithmes analysent des milliers de sources pour extraire
                les faits marquants sans biais éditorial.
              </p>
            </div>
            <div className="bg-gray-200 p-6 rounded-2xl border border-gray-300 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-gray-400">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 flex items-center gap-2">
                <Shield size={24} color="#10B981" /> Fiabilité
              </h3>
              <p className="text-base text-gray-800 opacity-90">
                Chaque résumé est accompagné de ses sources originales pour vous
                permettre de vérifier et d'approfondir chaque sujet.
              </p>
            </div>
            <div className="bg-gray-200 p-6 rounded-2xl border border-gray-300 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-gray-400">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 flex items-center gap-2">
                <Globe size={24} color="#3B82F6" /> Diversité
              </h3>
              <p className="text-base text-gray-800 opacity-90">
                Politique, Tech, Culture, Sport... Nous couvrons tous les
                domaines pour vous offrir une vision globale de l'actualité.
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-[1.75rem] font-bold text-gray-900 border-b-2 border-gray-400 pb-2">
            Transparence
          </h2>
          <p className="text-lg leading-relaxed text-gray-800">
            Nous croyons en une information transparente. Bien que nos résumés
            soient générés par une intelligence artificielle, nous nous
            engageons à toujours citer nos sources et à lutter contre la
            désinformation en croisant les données de multiples médias reconnus.
          </p>
        </section>

        <div className="mt-4 text-center text-gray-800 opacity-90">
          <span>Fait avec passion par </span>
          <a
            href="https://linkedin.com/in/titouancv"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold"
          >
            Titouan Carion Vignaud
          </a>
          <span> et </span>
          <a
            href="https://www.linkedin.com/in/arthur-colinet-a42a22210/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold"
          >
            Arthur Colinet
          </a>
          <br />
          <span>
            © {new Date().getFullYear()} Havite. Tous droits réservés.
          </span>
        </div>
      </div>
    </PageContainer>
  )
}

export default About
