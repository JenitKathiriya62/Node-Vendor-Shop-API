const Store = require("../models/storeModel");
const User = require("../models/usermodel");




const createStore = async(req,res)=>{
    try {
        
        const userData = await User.findOne({_id:req.body.vendor_id});
        if(userData){
            if(!req.body.latitude || !req.body.longitude){
                return res.status(200).send({success:false,msg:'Location Must Be Required'});
            }else{
                const storeData = await Store.findOne({vendor_id:req.body.vendor_id});
                if(storeData){
                    return res.status(200).send({success:false,msg:'Vendor Already Registered'});
                }else{
                    const store = new Store({
                            vendor_id:req.body.vendor_id,
                            logo:req.file.filename,
                            business_email:req.body.business_email,
                            address:req.body.address,
                            pin:req.body.pin,
                            location:{
                                type:"Point",
                                coordinates:[parseFloat(req.body.latitude),parseFloat(req.body.longitude)]
                            }
                    });

                    const vendorData = await store.save();
                    return res.status(200).send({success:true,msg:'Store Data',data:vendorData});


                }
            }


        }else{
           return res.status(200).send({success:false,msg:'Vendor Id Does not Exist..'});
        }



    } catch (error) {
       return res.status(400).send(error.message);
    }
}

const get_store = async(id)=>{
    try{
          return Store.findOne({_id:id});
    }catch(error){
        return res.status(400).send(error.message);

    }
}

const find_nearest_store = async(req,res)=>{
    try {
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;

       const storeData = await Store.aggregate([
            {
                $geoNear:{
                    near:{type:"Point",coordinates:[parseFloat(longitude),parseFloat(latitude)]},
                    key:"location",
                    maxDistance:parseFloat(4000)*1609,
                    distanceField:"dist.calculated",
                    spherical:true
                }
            }
        ]);
        res.status(200).send({success:true,msg:"Store Details",data:storeData});
    } catch (error) {
        return res.status(400).send(error.message);
        
    }
}

module.exports = {
    createStore,
    get_store,
    find_nearest_store,
}
