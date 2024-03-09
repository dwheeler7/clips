import styles from './Form.module.scss'

const Form = ({ children, onSubmit }) => {
    return (
      <form onSubmit={onSubmit} autoComplete="off" className={styles.form}>
        {children}
      </form>
    )
}

export default Form



