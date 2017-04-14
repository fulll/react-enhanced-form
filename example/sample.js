/* eslint-disable */
export default `
const PreviewInput = () => {

  const stylized = {
    height: 50,
    backgroundColor: '#fafafa',
    borderRadius: 3,
    paddingLeft: 10,
    fontSize: 20
  }

  const style = {
      default: {color: 'black', outline: 'none', width: 300, border: 'none', ...stylized},
      onFocus: {borderBottom: '1px solid green', ...stylized},
      onError: {borderBottom: '1px solid red', ...stylized}
    }

  const lessThan1000 = newValue => newValue < 1000
  const email = newValue => newValue.match(/^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
)

  const handleSubmit = (e) => {
    alert(e)
  }

  const Label = ({ children }) => {

    const style = {
      fontFamily: 'Sans-serif',
      fontWeight: 400,
      paddingLeft: 5,
      color: '#666'
    }

    return <h3 style={style}>{children}</h3>
}

  return (
    <form onSubmit={handleSubmit}>
      <Label>{'Must be less than 1000'}</Label>
      <Input
        type='number'
        value={1000}
        // onChange={(data, error) => console.log('change', data, error)}
        // onMount={(data,error) => console.log('mount', data, error)}
        style={style}
        check={lessThan1000}
        required
      />
      <br />
      <Label>{'Must be an email'}</Label>
      <Input
        type='text'
        value='name@domain.com'
        // onChange={(data, error) => console.log('change', data, error)}
        // onMount={(data,error) => console.log('mount', data, error)}
        style={style}
        check={email}
        required
      />
    </form>
  )
}

return <PreviewInput />
`
