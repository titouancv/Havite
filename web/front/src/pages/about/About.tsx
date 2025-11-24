import PageContainer from '../shared/components/page-container/PageContainer'
import styles from './about.module.scss'
import { Zap, Shield, Globe, BrainCircuit } from 'lucide-react'

function About() {
  return (
    <PageContainer>
      <div className={styles.about}>
        <div className={styles.hero}>
          <h1>L'information, simplifiée.</h1>
          <p>
            Havite utilise l'intelligence artificielle pour vous offrir des résumés d'actualités
            clairs, concis et impartiaux.
          </p>
        </div>

        <section className={styles.section}>
          <h2>Notre Mission</h2>
          <p>
            Dans un monde saturé d'informations, il devient difficile de distinguer l'essentiel du
            bruit. Notre mission est de redonner le pouvoir aux lecteurs en leur fournissant des
            synthèses intelligentes de l'actualité, sourcées et vérifiées, pour comprendre le monde
            en un coup d'œil.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Pourquoi Havite ?</h2>
          <div className={styles.features}>
            <div className={styles.featureCard}>
              <h3>
                <Zap size={24} color="#F59E0B" /> Rapidité
              </h3>
              <p>
                Accédez à l'essentiel de l'information en quelques secondes grâce à nos résumés
                générés en temps réel.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3>
                <BrainCircuit size={24} color="#8B5CF6" /> IA Avancée
              </h3>
              <p>
                Nos algorithmes analysent des milliers de sources pour extraire les faits marquants
                sans biais éditorial.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3>
                <Shield size={24} color="#10B981" /> Fiabilité
              </h3>
              <p>
                Chaque résumé est accompagné de ses sources originales pour vous permettre de
                vérifier et d'approfondir chaque sujet.
              </p>
            </div>
            <div className={styles.featureCard}>
              <h3>
                <Globe size={24} color="#3B82F6" /> Diversité
              </h3>
              <p>
                Politique, Tech, Culture, Sport... Nous couvrons tous les domaines pour vous offrir
                une vision globale de l'actualité.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Transparence</h2>
          <p>
            Nous croyons en une information transparente. Bien que nos résumés soient générés par
            une intelligence artificielle, nous nous engageons à toujours citer nos sources et à
            lutter contre la désinformation en croisant les données de multiples médias reconnus.
          </p>
        </section>

        <div className={styles.team}>
          <span>Fait avec passion par </span>
          <a
            href="https://linkedin.com/in/titouancv"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 'bold' }}
          >
            Titouan Carion Vignaud
          </a>
          <span> et </span>
          <a
            href="https://www.linkedin.com/in/arthur-colinet-a42a22210/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 'bold' }}
          >
            Arthur Colinet
          </a>
          <br></br>
          <span>© {new Date().getFullYear()} Havite. Tous droits réservés.</span>
        </div>
      </div>
    </PageContainer>
  )
}

export default About
