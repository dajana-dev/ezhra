import '../styles/Button.scss';

const Button = ({variant = 'primary', className = '', children, onClick, ...props}) => {
    const variants = {
        primary: 'primary',
        delete: 'delete',
        toggleTheme: 'toggle-theme',
        edit: '',
    }
    
    return ( 
        <button className={`${variants[variant]} ${className}`} onClick={onClick}>
            {children}
        </button>
     );
}
 
export default Button;