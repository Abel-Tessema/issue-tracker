'use client';

import {Button, Callout, Text, TextField} from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {Controller, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import axios from "axios";
import {useState} from 'react';
import {zodResolver} from "@hookform/resolvers/zod";
import {createIssueSchema} from "@/app/validationSchemas";
import z from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>;

function NewIssuePage() {
  const router = useRouter();
  const {register, control, handleSubmit, formState: {errors}}
    = useForm<IssueForm>({resolver: zodResolver(createIssueSchema)});
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
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          control={control}
          name='description'
          render={({field}) => <SimpleMDE placeholder='Description' {...field}/>}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
