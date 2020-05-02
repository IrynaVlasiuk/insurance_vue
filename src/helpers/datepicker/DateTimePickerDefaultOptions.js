export default {
  shortcuts: [{
    text: 'Aujourd\'hui',
    onClick (picker) {
      picker.$emit('pick', new Date())
    }
  },
    {
      text: 'Hier',
      onClick (picker) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24)
        picker.$emit('pick', date)
      }
    },
    {
      text: 'Une semaine',
      onClick (picker) {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        picker.$emit('pick', date)
      }
    }]
}
