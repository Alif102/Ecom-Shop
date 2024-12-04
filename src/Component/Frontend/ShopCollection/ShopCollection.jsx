import React from 'react'
 import co1 from '../../../../src/assets/co1.jpg'
 import co2 from '../../../../src/assets/co2.jpg'
 import co3 from '../../../../src/assets/co3.jpg'
 import co4 from '../../../../src/assets/co4.jpg'
 import co5 from '../../../../src/assets/co5.jpg'


const ShopCollection = () => {
  return (
    <div className=' mb-20'>
                <h2 className="text-center text-2xl  md:text-3xl font-semibold pollinator mb-8"> <span className=" border border-pink-500 border-l-4 mr-3"></span> Shop Collections</h2>

        <div className='flex flex-col md:flex-row items-center gap-3 w-full justify-center'>

<div>
<img src={co1} alt="imageee"  />
<img src={co2} alt="imageee"  />
</div>
<div>
<img src={co3} alt="imageee"  />
</div>
<div>
<img src={co4} alt="imageee"  />
<img src={co5} alt="imageee"  />
</div>



</div>
    </div>
  )
}

export default ShopCollection
