module.exports = {
  purge: [
    './resources/**/*.html',
    './resources/**/*.php',
    './resources/**/*.js',
    './public/**/*.js',
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
        },
        flipIn: {
          'from, 40%, 60%, 80%, to': {
            'backface-visibility': 'hidden'
          },
          'from': {
            'transform': 'perspective(400px) rotate3d(0, 1, 0, 180deg)',
            'animation-timing-function': 'ease-in',
            'opacity': 0
          },
          '40%': {
            'transform': 'perspective(400px) rotate3d(0, 1, 0, -20deg)',
            'animation-timing-function': 'ease-in',
            'opacity': 1
          },
          '60%': {
            'transform': 'perspective(400px) rotate3d(0, 1, 0, 10deg)',
          },
          '80%': {
            'transform': 'perspective(400px) rotate3d(0, 1, 0, -5deg)'
          },
          'to': {
            'transform': 'perspective(400px)'
          }
        },
        flipOut: {
          'from, 40%, 60%, 80%, to': {
            'backface-visibility': 'visible'
          },
          'from': {
            'transform': 'perspective(400px) rotate3d(0, 1, 0, -15deg)',
          },
          'to': {
            'transform': 'perspective(400px) rotate3d(0, 1, 0, 180deg)',
          }
        }
      },
      animation: {
        bounceIn: 'bounceIn 0.75s',
        flipIn: 'flipIn 0.75s',
        flipOut: 'flipOut 0.5s',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
