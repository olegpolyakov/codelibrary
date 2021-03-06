import React from 'react';
import {
    Button,
    Dialog, DialogTitle, DialogContent, DialogActions
} from 'mdc-react';

import './index.scss';

export default function FormDialog({ form, open, title, onClose, children }) {
    return (
        <Dialog
            className="form-dialog"
            open={open}
            onClose={onClose}
        >
            {title &&
                <DialogTitle>{title}</DialogTitle>
            }

            <DialogContent>
                {children}
            </DialogContent>

            <DialogActions>
                <Button type="button" onClick={onClose}>Закрыть</Button>
                <Button type="submit" form={form}>Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
}