import ButtonDemo from '../../components/ButtonDemo'
import styles from './Buttons.module.scss'

export default function Buttons() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Button Component Library</h1>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Regular Button - Primary</h3>
        <div className={styles.demoSection}>
          <div className={styles.demoRow}>
            <h4 className={styles.demoLabel}>Default</h4>
            <ButtonDemo type="primary" variation="default" buttonText="Primary" />
          </div>

          <div className={styles.demoRow}>
            <h4 className={styles.demoLabel}>Focus</h4>
            <ButtonDemo type="primary" variation="focus" buttonText="Primary" />
          </div>
          <div className={styles.demoRow}>
            <h4 className={styles.demoLabel}>Disabled</h4>
            <ButtonDemo type="primary" variation="disabled" buttonText="Primary" />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Large Button - Primary</h3>
        <div className={styles.demoSection}>
          <div className={styles.demoRow}>
            <h4 className={styles.demoLabel}>Default</h4>
            <ButtonDemo type="primary" variation="default" size="large" buttonText="Primary" />
          </div>

          <div className={styles.demoRow}>
            <h4 className={styles.demoLabel}>Focus</h4>
            <ButtonDemo type="primary" variation="focus" size="large" buttonText="Primary" />
          </div>
          <div className={styles.demoRow}>
            <h4 className={styles.demoLabel}>Disabled</h4>
            <ButtonDemo type="primary" variation="disabled" size="large" buttonText="Primary" />
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Regular Button - Secondary</h3>
        <div className={styles.demoSection}>
          <div className={styles.demoRow}>
            <h4 className={styles.demoLabel}>Default</h4>
            <ButtonDemo type="secondary" variation="default" buttonText="secondary" />
          </div>

          <div className={styles.demoRow}>
            <h4 className={styles.demoLabel}>Focus</h4>
            <ButtonDemo type="secondary" variation="focus" buttonText="secondary" />
          </div>
          <div className={styles.demoRow}>
            <h4 className={styles.demoLabel}>Selected</h4>
            <ButtonDemo type="secondary" variation="selected" buttonText="secondary" />
          </div>
          <div className={styles.demoRow}>
            <h4 className={styles.demoLabel}>Disabled</h4>
            <ButtonDemo type="secondary" variation="disabled" buttonText="secondary" />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Large Button - Secondary</h3>
        <div className={styles.demoSection}>
          <div className={styles.demoRow}>
            <h4 className={styles.demoLabel}>Default</h4>
            <ButtonDemo type="secondary" variation="default" size="large" buttonText="secondary" />
          </div>

          <div className={styles.demoRow}>
            <h4 className={styles.demoLabel}>Focus</h4>
            <ButtonDemo type="secondary" variation="focus" size="large" buttonText="secondary" />
          </div>
          <div className={styles.demoRow}>
            <h4 className={styles.demoLabel}>Selected</h4>
            <ButtonDemo type="secondary" variation="selected" size="large" buttonText="secondary" />
          </div>
          <div className={styles.demoRow}>
            <h4 className={styles.demoLabel}>Disabled</h4>
            <ButtonDemo type="secondary" variation="disabled" size="large" buttonText="secondary" />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Regular Button - Text</h3>
        <div className={styles.demoSection}>
          <div className={styles.demoRow}>
            <h4 className={styles.demoLabel}>Default</h4>
            <ButtonDemo type="text" variation="default" buttonText="Text" />
          </div>
          <div className={styles.demoRow}>
            <h4 className={styles.demoLabel}>Focus</h4>
            <ButtonDemo type="text" variation="focus" buttonText="Text" />
          </div>
          <div className={styles.demoRow}>
            <h4 className={styles.demoLabel}>Disabled</h4>
            <ButtonDemo type="text" variation="disabled" buttonText="Text" />
          </div>
        </div>
      </section>
    </div>
  )
}
