export default function BasicInput({
  value,
  setValue,
  placeholder,

  style={},
  contentStyle={},
  leftComponent=null,
  autoFormat=false,
}) {
  
  const handleChangeInput = (e) => {
    setValue(autoFormat ? e.target.value.replace(/\b\w/g, l => l.toUpperCase()) : e.target.value)
  }

  return (
    <div style={{ ...styles.container, ...style }}>
      {leftComponent && leftComponent}
      <input 
        style={{ ...styles.input, ...contentStyle }}
        value={value}
        onChange={handleChangeInput}
        placeholder={placeholder}
      />
    </div>
  )
}

const styles = {
  container: {
    borderRadius: 12,
    width: '100%',
    backgroundColor: '#222',
    padding: '18px',

    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },
  input: {
    display: 'flex',
    flex: 1,
    fontSize: 16,
    fontWeight: 700,
    color: '#fff',
    border: 'none',
    outline: 'none',

    backgroundColor: 'transparent',
  }
}
