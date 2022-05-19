/*<label htmlFor={`${product.ID}`} className={classes.picFileLabel_oldProduct}>
	<i class="fa-solid fa-image"></i>
	<input 
		className={classes.picFileInput} 
        id={`${product.ID?(product.ID):(product.localid)}`} 
		type="file"  
	    name="picFile" 
		accept="image/*"  
		onChange={(e)=>hanldeChanges(e,index)}
	/> 
</label>*/

import React from 'react'

const pija = {ud:"chaterusde"}
const DeleteButton = () => {
  return (
<div>

<div>{`${pija.ID||pija.ud}`}</div>

</div>
  )
}

export default DeleteButton
