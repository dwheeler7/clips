const bcrypt = require('bcrypt')
const { model, Schema } = require('mongoose')

const SALT_ROUNDS = 6

const userSchema = new Schema ({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    clippings: [{ type: Schema.Types.ObjectId, ref: 'Clipping' }],
    password: {
        type: String,
        required: true,
        trim: true
    },
    isClipper: { type: Boolean, required: true, default: false }
    }, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password
            return ret
        }
    }
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
    return next()
})

const User = model('User', userSchema)  

module.exports = User