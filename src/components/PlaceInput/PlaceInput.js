import React, { Component } from 'react';
import DefaultInput from '../../components/UI/DefaultInput';

 const placeInput = props => (
    <DefaultInput 
    placeholder="Place Name" 
    onChangeText={props.onChangeText}
    value={props.placeData.placeName} 
    valid={props.placeData.valid}
    touched={props.placeData.touched}/>
 )

  export default placeInput;