const notFount = (req,resp) => resp.status(404).send("Routes does not exist");

export default notFount;