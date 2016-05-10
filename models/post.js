var mongoose        = require( 'mongoose' ),
    PostSchema      = new mongoose.Schema({
        author          : {
            type        : String,
            required    : true
        },
        category        : {
            type        : mongoose.Schema.Types.ObjectId,
            ref         : 'Category',
            required    : true
        },
        content         : {
            type        : String,
            required    : true
        },
        created_by      : {
            type        : mongoose.Schema.Types.ObjectId,
            ref         : 'User',
            required    : true
        },
        creation_date   : {
            type        : Date,
            required    : true,
            default     : Date.now
        },
        datasets        : {
            type        : [ String ],
            required    : false
        },
        edited_by       : {
            type        : mongoose.Schema.Types.ObjectId,
            ref         : 'User',
            required    : false
        },
        edition_date    : {
            type        : Date,
            required    : false
        },
        name            : {
            type        : String,
            required    : true,
            index       : {
                unique  : true
            }
        },
        published_by    : {
            type        : mongoose.Schema.Types.ObjectId,
            ref         : 'User',
            required    : false
        },
        published_date  : {
            type        : Date,
            required    : false
        },
        section         : {
            type        : mongoose.Schema.Types.ObjectId,
            ref         : 'Category',
            required    : true
        },
        slug            : {
            type        : String,
            required    : true
        },
        status          : {
            type        : String,
            required    : true
        },
        tags            : [{
            type        : mongoose.Schema.Types.ObjectId,
            ref         : 'Category',
            required    : false
        }]
    });

module.exports  = mongoose.model( 'Post', PostSchema );