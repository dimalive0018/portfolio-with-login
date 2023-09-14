const schema = require('mongoose').Schema;

const projectSchema = new schema({
    name: {
        type: String,
        trim: true,
        validate: {
            validator: function (name) {
                return name.length >= 2;
            },
            message: 'Name must be at least 2 characters long'
        }
    },
    sourceLink: {
        type: String,
        trim: true
    },
    siteLink: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        validate: {
            validator: function (description) {
                return description.length >= 10;
            },
            message: 'Description must be at least 10 characters long'
        }
    },
    forSite: {
        type: String,
        trim: true,
        validate: {
            validator: function (entity) {
                return entity.length >= 5;
            },
            message: 'Private entity must be at least 5 characrets long'
        }
    }
}, { timestamps: true });

projectSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const Project = require('mongoose').model('project', projectSchema);

module.exports = Project;