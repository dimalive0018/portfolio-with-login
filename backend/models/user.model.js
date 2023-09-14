const schema = require('mongoose').Schema;

const userSchema = new schema({
    email: {
        type: String,
        trim: true,
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: 'Invalid email'
        }
    },
    password: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/.test(value);
            },
            message: props => `Password ${props.value} must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number and must not contain white spaces`
        }
    },
    role: {
        type: String,
        default: 'user'
    }
}, { timestamps: true });

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const User = require('mongoose').model('user', userSchema);

module.exports = User;