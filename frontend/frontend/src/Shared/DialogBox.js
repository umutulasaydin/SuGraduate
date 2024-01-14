import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Toast } from 'primereact/toast';
import emailjs from '@emailjs/browser';
import { useMediaQuery } from 'react-responsive';

function DialogBox(props) {
    //Responsive
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 500px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 500px)' })
    const toast = useRef(null);
    const topics = ["Suggestion", "Bug", "Question"]
    const defaultValues = { description: '', name: '', topic: '', mail: '' };
    const form = useForm({ defaultValues });
    const errors = form.formState.errors;
    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted' });
    };

    const onSubmit = (data) => {
        show();
        emailjs.send('service_91bdbxl', 'template_59v5wb8', data, 'ODvTPArmdr8L_mZTv')
        form.reset();
    };
    return (
        <Dialog header="Contact us" visible={props.visible}  onHide={() => props.setVisible(false)} className={(isDesktopOrLaptop && " w-full") + (isTabletOrMobile && " w-full mx-1")}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-column gap-3' >
                <Toast ref={toast} />
                <Controller

                    name="name"
                    control={form.control}
                    rules={{ required: 'Name is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText placeholder='Full Name' id={field.name} {...field} className={{ 'p-invalid': fieldState.error }} />

                            </div>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />

                <Controller

                    name="mail"
                    control={form.control}
                    rules={{ required: 'Mail is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-envelope"></i>
                                </span>
                                <InputText placeholder='Mail Address' id={field.name} {...field} className={{ 'p-invalid': fieldState.error }} />

                            </div>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />

                <Controller

                    name="topic"
                    control={form.control}
                    rules={{ required: 'Topic is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-question"></i>
                                </span>
                                <Dropdown placeholder='Chose Topic' options={topics} id={field.name} {...field} className={{ 'p-invalid': fieldState.error }} />

                            </div>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />

                <Controller

                    name="description"
                    control={form.control}
                    rules={{ required: 'Description is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-pencil"></i>
                                </span>
                                <InputTextarea placeholder='Description' id={field.name} {...field} rows={5} className={{ 'p-invalid': fieldState.error }} />

                            </div>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <div className='flex justify-content-end gap-2'>
                    <Button label='Cancel' severity='secondary' onClick={() => props.setVisible(false)} />
                    <Button label='Submit' type='submit' />
                </div>
            </form>


        </Dialog>
    );
}

export default DialogBox;