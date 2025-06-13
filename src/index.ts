import server from './server'
const PORT = process.env.port || 3000;

server.listen(PORT, () => {
    console.log("Server online in port:", PORT)
})