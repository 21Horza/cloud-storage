import React from 'react';
import './file.css'
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setDir } from '../../../../store/reducers/fileReducer';
import {deleteFile, downloadFiles} from "../../../../store/actions/file"
import {AiFillFile} from 'react-icons/ai'
import {GoFileDirectory} from 'react-icons/go'

const File = (files) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.files.view)
    
    const file = files.file
    
    function openHandler(file) {
        if(file.type ==='dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setDir(files.file._id))
        }
    }

    function downloadHandler(e) {
        e.stopPropagation()
        downloadFiles(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    function sizeFormat(size) {
        if(size > 1024*1024*1024) {
            return (size/(1024*1024*1024)).toFixed(1)+"Gb"
        }
        if(size > 1024*1024) {
            return (size/(1024*1024)).toFixed(1)+"Mb"
        }
        if(size > 1024) {
            return (size/(1024)).toFixed(1)+"Kb"
        }
        return size+"B"
    }

    if(fileView === 'list') {
        return (
            <div className='file' onClick={() => openHandler(file)}>
                {files.file.type === 'dir' 
                ? <GoFileDirectory className='dirIcon'/>
                : <AiFillFile className='fileIcon'/>
                } 
                <div className="file__name">
                    {files.file.name}
                </div>
                <div className="file__date">
                    {files.file.date.slice(0, 10)}
                </div>
                <div className="file__size">
                    {sizeFormat(files.file.size)}
                </div>
                {file.type !== 'dir' && 
                    <div className="btnsFile">
                    <button 
                    onClick={(e) => downloadHandler(e)} 
                    className="file__btn file__download">
                        download
                    </button>
                    <button 
                    onClick={(e) => deleteClickHandler(e)} 
                    className="file__btn file__delete">
                        delete
                    </button>
                </div>}
            </div>
        );
    }

    if (fileView === 'plate') {
        return (
            <div className='file-plate' onClick={() => openHandler(file)}>
               {file.type === 'dir' 
                ? <GoFileDirectory className='dirIcon'/>
                : <AiFillFile className='fileIcon'/>
                }
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns">
                    {file.type !== 'dir' &&
                        <div className="btns">
                        <button 
                        onClick={(e) => downloadHandler(e)} 
                        className="file-plate__btn file-plate__download">
                            download
                        </button>
                        <button
                        onClick={(e) => deleteClickHandler(e)} 
                        className="file-plate__btn file-plate__delete">
                            delete
                        </button>
                    </div>}
                </div>
            </div>
        );
    }

};

export default File;