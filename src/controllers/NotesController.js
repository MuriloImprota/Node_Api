const knex = require("../database/knex") //import knex

class NotesController {   //created class notescontroller to create several async functions

    async create(req, res) {                                          //this function, is designed to create notes by requesting body statements and user params
        const { title, description, rating, tags } = req.body
        const { user_id } = req.params

        const [note_id] = await knex("notes").insert({     //insert notes data information in an array
            title,
            description,
            rating,
            user_id
        });

        const tagsInsert = tags.map(name => { //search in tags table, names and return note, user and name
            return {
                note_id,
                user_id,
                name
            }
        });

        await knex("tags").insert(tagsInsert)

        res.json(); //return in json format
    }

    async show(req, res) {
        const { id } = req.params

        const note = await knex("notes").where({ id }).first();
        const tags = await knex("tags").where({ note_id: id }).orderBy("name");

        return res.json({
            ...note,
            tags
        })
    }

    async delete(req, res) {
        const { id } = req.params

        await knex("notes").where({ id }).delete();

        return res.json()
    }

    async list(req, res) {
        const { title, user_id, tags } = req.query;

        try {
            if (tags) {
                const filterTags = tags.split(',').map(tag => tag.trim());

                const filteredNotes = await knex("tags")
                    .whereIn("name", filterTags)
                    .andWhere({ "tags.user_id": user_id })
                    .select(
                        "tags.note_id",
                        "tags.user_id",
                        "notes.title as note_title"
                    )
                    .innerJoin("notes", "notes.id", "tags.note_id")
                    .groupBy("tags.note_id", "tags.user_id", "notes.title");

                // Para cada nota encontrada, buscar as tags associadas
                const detailedNotes = await Promise.all(
                    filteredNotes.map(async note => {
                        const associatedTags = await knex("tags")
                            .where({ note_id: note.note_id, user_id: note.user_id })
                            .select("id", "name", "note_id", "user_id");

                        return {
                            ...note,
                            tags: associatedTags
                        };
                    })
                );

                return res.json(detailedNotes);
            } else {
                // Buscar as notas pelo título e user_id
                const notes = await knex("notes")
                    .where({ user_id })
                    .whereLike("title", `%${title || ''}%`)
                    .select("id as note_id", "user_id", "title as note_title");

                // Para cada nota encontrada, buscar as tags associadas
                const detailedNotes = await Promise.all(
                    notes.map(async note => {
                        const associatedTags = await knex("tags")
                            .where({ note_id: note.note_id, user_id: note.user_id })
                            .select("id", "name", "note_id", "user_id");

                        return {
                            ...note,
                            tags: associatedTags
                        };
                    })
                );

                return res.json(detailedNotes);
            }
        } catch (error) {
            console.error("Erro ao buscar notas:", error);
            return res.status(500).json({ error: "Erro ao buscar notas." });
        }


    }
}

module.exports = NotesController