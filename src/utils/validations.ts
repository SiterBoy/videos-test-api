import {ErrorsType, FieldErrorType} from "../types/interfaces/errors.interface";
import {IVideoPostPut} from "../types/interfaces/video.interface";
import {type} from "os";

export type ResloutionsType = 'P144' | "P240" | 'P360' | 'P480' | 'P720' | "P1080" | "P1440" | 'P2160';
export const resloutions: Array<ResloutionsType> = ['P144',  "P240" , 'P360',  'P480' , 'P720' , "P1080" , "P1440" , 'P2160'];
export const validateVideo = (data:IVideoPostPut): ErrorsType   => {
  const errors: Array<FieldErrorType> = [];
  let { title, author, canBeDownloaded, minAgeRestriction,  availableResolutions, publicationDate} = data;
  if(availableResolutions) {
    availableResolutions = JSON.parse(availableResolutions);
  }

  if(!author) {
    errors.push({message: 'Author required', field: 'Author'})
  }

  if(!title) {
    errors.push({message: 'Title required', field: 'Title'})
  }

  if(typeof title !== 'string') {
    errors.push({message: 'Title should be a string', field: "title"})
  }

  if(typeof author !== 'string') {
    errors.push({message: 'Author should be a string', field: 'author'})
  }

  if(availableResolutions && !Array.isArray(availableResolutions)) {
    errors.push({message: 'availableResolutions should be Array', field: 'availableResolutions'})
  }

  if(canBeDownloaded && typeof canBeDownloaded !== 'boolean') {
    errors.push({message: 'canBeDownloaded should be a boolean', field: 'canBeDownloaded'})
  }

  if(minAgeRestriction && typeof minAgeRestriction !== 'number') {
    errors.push({message: 'minAgeRestriction should be a number', field: 'minAgeRestriction'})
  }

  if(title?.length > 40) {
    errors.push({message: 'Title length must be shorter 40 symbols', field: 'Title'})
  }

  if(author?.length > 20) {
    errors.push({message: 'Author length must be shorter 20 symbols', field: 'Author'})
  }

  if(minAgeRestriction && (minAgeRestriction < 1 || minAgeRestriction > 18)) {
    errors.push({message: 'minAgeRestriction should be between 1 and 18', field: 'minAgeRestriction'})
  }

  if(publicationDate && typeof Date.parse(publicationDate) === "number" ) {
    errors.push({message: 'publicationDate should be date', field: 'publicationDate'});
  }

  if(Array.isArray(availableResolutions)) {
    availableResolutions.forEach((el) => {
      if(!resloutions.includes(el)) {
        errors.push({message:`availableResolutions dont exsist value ${el}`, field:'availableResolutions'})
      }
    })
  }

  return {errorsMessages: errors}
}