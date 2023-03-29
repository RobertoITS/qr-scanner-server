import app from './app'

const main = () => {
    app.listen(app.get('port')) //* Get the port in app.js
    console.log(`Server on port ${app.get('port')}`)
}

main()