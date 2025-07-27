import prisma from "../db.js";

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const createUser = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, username, password },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Username mungkin sudah terdaftar." });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, username, password } = req.body;
  try {
    const updated = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, username, password },
    });
    res.json(updated);
  } catch (error) {
    res.status(404).json({ error: "User tidak ditemukan" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    res.json({ message: "User dihapus" });
  } catch (error) {
    res.status(404).json({ error: "User tidak ditemukan" });
  }
};
