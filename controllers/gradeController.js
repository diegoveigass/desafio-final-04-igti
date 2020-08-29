import { db } from '../models/index.js';
import { logger } from '../config/logger.js';
import Student from '../models/Student.js';

const create = async (request, response) => {
  try {
    const { name, subject, type, value } = request.body;

    const student = new Student({
      name,
      subject,
      type,
      value,
    });

    await student.save();
    response.json(student);
    logger.info(`POST /grade - ${JSON.stringify()}`);
  } catch (error) {
    response
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (request, response) => {
  const { name } = request.query;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const students = await Student.find(condition);
    logger.info(`GET /grade`);
    return response.json(students);
  } catch (error) {
    response
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (request, response) => {
  try {
    const { id } = request.params;

    const student = await Student.findById(id);

    if (!student) {
      return response.status(400).json({ error: 'Sorry, student not found!' });
    }

    logger.info(`GET /grade - ${id}`);
    return response.json(student);
  } catch (error) {
    response.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (request, response) => {
  if (!request.body) {
    return response.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  try {
    const { id } = request.params;
    const { name, subject, type, value } = request.body;

    const student = await Student.findById(id);

    if (!student) {
      return response.status(400).json({ error: 'Sorry, student not found' });
    }

    const studentUpdated = await Student.findByIdAndUpdate(
      id,
      {
        name,
        subject,
        type,
        value,
      },
      { new: true }
    );

    logger.info(`PUT /grade - ${id} - ${JSON.stringify()}`);
    return response.json(studentUpdated);
  } catch (error) {
    response
      .status(500)
      .send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (request, response) => {
  try {
    const { id } = request.params;

    const student = await Student.findByIdAndDelete({ _id: id });

    if (!student) {
      return response.status(400).json({ error: 'Sorry student not found!' });
    }

    logger.info(`DELETE /grade - ${id}`);
    return response.json({ ok: `Student - ${id} deleted successfull ` });
  } catch (error) {
    response
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (request, response) => {
  try {
    await Student.deleteMany({});
    logger.info(`DELETE /grade`);
    return response.json({ ok: 'All students deleted!' });
  } catch (error) {
    response.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
