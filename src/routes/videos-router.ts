import {Request, Response, Router} from "express";
import {IVideo} from "../types/interfaces/video.interface";
import {ResloutionsType, validateVideo} from "../utils/validations";
import bodyParser from "body-parser";
import {FieldErrorType} from "../types/interfaces/errors.interface";

export const videosRouter = Router({});

export const videos: Array<IVideo>= [
  {
    id: 1,
    title: 'Terminator',
    author: 'Stiven King',
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: ['P1080', 'P2160'],
  }
];

videosRouter.get('/', (req: Request, res: Response) => {
  res.status(200).send(videos);
});

videosRouter.get('/:id', (req: Request, res: Response) => {
  const id = +req.params.id;
  const findObject = videos.find((video) => video.id === id);
  if (findObject) res.status(200).send(findObject);
  res.status(404).send();
});

videosRouter.post('/', (req: Request, res: Response) => {
  const resultOfValidation = validateVideo(req.body);

  let availableResolutions: Array<ResloutionsType> | null;

  if(req.body.availableResolution) {
    availableResolutions = JSON.parse(req.body.availableResolutions);
  }

  if (resultOfValidation.errorsMessages.length === 0) {
    const newVideo:IVideo = {
      id: Math.round(Math.random() * Math.random() * 1000000),
      title: req.body.title,
      author: req.body.author,
      canBeDownloaded: req.body.canBeDownloaded ? req.body.canBeDownloaded : false,
      minAgeRestriction: req.body.minAgeRestriction ? +req.body.minAgeRestriction : null,
      createdAt: new Date().toISOString(),
      publicationDate: (new Date(Date.now() + (3600 * 1000 * 24))).toISOString(),
      availableResolutions: req.body.availableResolutions? JSON.parse(req.body.availableResolutions) : null,
    }

    videos.push(newVideo)

    res.status(201).json(newVideo);
    return;
  }

  res.status(400).json(resultOfValidation);
})

videosRouter.delete('/:id', (req:Request, res:Response) => {
  const id = +req.params.id;
  const findObjectIndex = videos.findIndex((video) => video.id === id);

  if(findObjectIndex !== -1) {
    videos.splice(findObjectIndex, 1)
    res.send(204);
  }
  res.send(404);
})

videosRouter.put('/:id', (req: Request, res: Response) => {
  const id = +req.params.id;

  const currentVideoIndex = videos.findIndex((el) => el.id === id);

  if(currentVideoIndex === -1) {
    res.status(404).send();
    return;
  }

  const resultOfValidation = validateVideo(req.body);

  if(resultOfValidation.errorsMessages.length === 0) {
    videos[currentVideoIndex] = {
      id: id,
      title: req.body.title? req.body.title: videos[currentVideoIndex].title,
      author: req.body.author? req.body.author: videos[currentVideoIndex].author,
      canBeDownloaded: req.body.canBeDownloaded? req.body.canBeDownloaded: videos[currentVideoIndex].canBeDownloaded,
      minAgeRestriction: req.body.minAgeRestriction? req.body.minAgeRestriction: videos[currentVideoIndex].minAgeRestriction,
      createdAt: videos[currentVideoIndex].createdAt,
      publicationDate: req.body.publicationDate? new Date(Date.parse(req.body.publicationDate)).toISOString(): videos[currentVideoIndex].publicationDate,
      availableResolutions: req.body.availableResolutions? req.body.availableResolutions: videos[currentVideoIndex].availableResolutions,
    }
    res.status(204).send();
    return;
  }

  res.status(400).json(resultOfValidation);
})