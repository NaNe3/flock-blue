export default function FadeInView({ 
  className = '',
  children, 
  style = {},
  ...props 
}) {

  return (
    <div 
      className={`fade-in-view ${className}`} 
      style={style} 
      {...props}
    >
      {children}
    </div>
  )
}
