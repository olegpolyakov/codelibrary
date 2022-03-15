import {
    Button,
    Dialog
} from 'mdc-react';

import './index.scss';

export default function FormDialog({
    title,
    open,
    children,
    form = children.props.id,
    onClose,
    ...props
}) {
    return (
        <Dialog
            className="form-dialog"
            title={title}
            open={open}
            actions={[
                <Button type="button" onClick={onClose}>Закрыть</Button>,
                <Button type="submit" form={form} outlined>Сохранить</Button>
            ]}
            onClose={onClose}
            {...props}
        >
            {children}
        </Dialog>
    );
}