module.exports = {
  purge: [
    './resources/**/*.html',
    './resources/**/*.php',
    './resources/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        bounceIn: {
          '0%, 20%, 40%, 60%, 80%, to': { transform: 'rotate(-3deg)' },
          '0%': {
            opacity: 0,
            transform: 'scale3d(.3,.3,.3)'
          },
          '20%': {
            transform: 'scale3d(1.1,1.1,1.1)'
          },
          '40%': {
            transform: 'scale3d(.9,.9,.9)'
          },
          '60%': {
            transform: 'scale3d(1.03,1.03,1.03)'
          },
          '80%': {
            transform: 'scale3d(.97,.97,.97)'
          },
          'to': {
            opacity: 1,
            transform: 'scaleX(1)'
          },
        }
      },
      animation: {
        bounceIn: 'bounceIn 0.75s',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
