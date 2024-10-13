'use client';

import {Button, Callout, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import axios from "axios";
import {useState} from 'react';

interface IssueForm {
  title: string,
  description: string
}

function NewIssuePage() {
  const router = useRouter();
  const {register, control, handleSubmit} = useForm<IssueForm>();
  const [error, setError] = useState('');
  
  return (
    <div className='max-w-xl space-y-3'>
      {error && <Callout.Root color='red'>
          <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (e) {
            setError('An unexpected error occurred.');
          }
        })}
      >
        <TextField.Root placeholder='Title' {...register('title')}/>
        <Controller
          control={control}
          name='description'
          render={({field}) => <SimpleMDE placeholder='Description' {...field}/>}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
