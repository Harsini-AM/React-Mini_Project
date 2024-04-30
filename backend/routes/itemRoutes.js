import express from 'express'
import { addItem, itemList, removeItem} from '../controllers/itemController.js'
import multer from 'multer'

const itemRouter = express.Router();

//Image storage Engine
const storage = multer.diskStorage({
    destination : 'uploads',
    filename:(req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})
itemRouter.post('/add',upload.single('image'),addItem);
itemRouter.post('/add',addItem)
itemRouter.get('/list', itemList)
itemRouter.post('/remove',removeItem)

export default itemRouter;
