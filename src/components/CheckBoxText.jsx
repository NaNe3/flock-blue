import { useHolos } from "../context/HolosProvider";

export default function CheckBoxedText({ text, checked, setChecked }) {
  const { color } = useHolos()

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  }  

  return (
    <div style={styles.container}>
      <input 
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        style={{
          ...styles.checkbox,
          backgroundColor: checked ? color : '#333',
          // border: checked ? '2px solid #0ba3ff' : '2px solid #666',
        }}
      />
      <p style={styles.checkboxText}>{text}</p>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 15,
  },
  checkbox: {
    width: 18,
    height: 18,

    flexShrink: 0,

    border: 'none',
    outline: 'none',
    WebkitAppearance: 'none',
    appearance: 'none',

    backgroundColor: '#333',
    borderRadius: 5,

  },
  checkboxText: {
    fontSize: 18,
    fontWeight: 700,
  },
}