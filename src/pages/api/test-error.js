const handler = async (req, res) => {
	res.status(502).json({ message: 'hola' });
};

export default handler;
