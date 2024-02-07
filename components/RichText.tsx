'use client';
import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface RichTextEditorProps {
    data: string;
    disable?: boolean;
    onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ data, onChange, disable }) => {
    return (
        <CKEditor
            disabled={disable}
            editor={ClassicEditor}
            data={data}
            config={{
                toolbar: [ 'undo', 'redo', 'bold', 'italic', 'numberedList', 'bulletedList' ]
        }}
            onChange={(event, editor) => {
                const content = editor.getData();
                onChange(content);
            }}
        />
    );
};

export default RichTextEditor;
