module.exports = {
  title: 'Message',
  context: {
    linkAnchor: 'Action\'s details',
    closeIcon: 'close',
    text: 'Some action / promotion text',
    modifier: 'top'
  },
  variants: [
    {
      name: 'With button',
      context: {
        linkAnchor: 'Details',
        closeIcon: false,
        closeLabel: 'OK, close',
        text: 'This website uses cookies. For information on cookies and how you can disable them see our',
        modifier: 'with-button'
      }
    }
  ]
};