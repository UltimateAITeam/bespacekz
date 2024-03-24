import React from 'react';
import Avatar from "react-avatar-edit";

function UploadAvatar({propSrc, preview, setPreview}: {propSrc: string | null, preview: string | null, setPreview: (preview: string | null) => void}) {
    return (
        <div>
            <Avatar
                onClose={() => setPreview(null)}
                onCrop={(preview) => setPreview(preview)}
                height={250}
                width={250}
                src={propSrc || undefined}
            />
        </div>
    );
}

export default UploadAvatar;