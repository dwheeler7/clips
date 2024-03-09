import styles from './Input.module.scss'

function Input({ type, name, placeholder, value, onChange, required, disabled }) {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
        required={required ? true : false}
        disabled={disabled ? disabled : false}
      />
    )
  }
  
  export default Input