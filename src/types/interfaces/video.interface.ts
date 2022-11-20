
import {ResloutionsType} from "../../utils/validations";

export interface IVideo {
  id: number;
  title: string;
  author: string;
  canBeDownloaded?: boolean;
  minAgeRestriction?: number | null;
  createdAt: string;
  publicationDate: string;
  availableResolutions: Array<ResloutionsType> | null;
}

export interface IVideoPostPut {
  title: string;
  author: string;
  canBeDownloaded? : boolean;
  minAgeRestriction? : number | null;
  availableResolutions?: string;
  publicationDate?: string;
}