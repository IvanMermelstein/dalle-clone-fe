import { surpriseMePrompts } from '../constants';
import { saveAs } from 'file-saver';

const getRandomPrompt = (prompt: string): string => {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
};

const downloadImage = async (_id: string, photo: string) => {
  saveAs(photo, `download-${_id}.jpg`);
};

export {getRandomPrompt, downloadImage};