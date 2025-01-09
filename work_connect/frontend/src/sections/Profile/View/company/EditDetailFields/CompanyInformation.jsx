// import { useState } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from 'prop-types';
// import { useSessionStorage } from "src/hooks/use-sessionStorage";
import Tooltip from "@mui/material/Tooltip";
import Switch from '@mui/material/Switch';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Stack from '@mui/material/Stack';

const CompanyInformation = ({ info,HandleChangePublicStatus,HandleAddRow,HandleDeleteRow,HandleCompanyInformationChange}) => {
    // const [companyInfo, setCompanyInfo] = useState(info);
    // const { getSessionData, updateSessionData } = useSessionStorage();

    // useEffect(() => {
    //     const SessionData = getSessionData("accountData");

    //     if (SessionData.CompanyInformation && SessionData.CompanyInformation.length > 0) {
    //         const sessionItem = SessionData.CompanyInformation.find(item => item.id === info.id);
    //         if (sessionItem) {
    //             setCompanyInfo(sessionItem);
    //         }
    //     }
    // }, [info]);

    // const handleChange = (e, genre) => {
    //     let newValue;

    //     if (genre === "public_status") {
    //         // Switch の状態に基づいて public_status を切り替え
    //         newValue = e.target.checked ? 1 : 0; // checkedがtrueなら1、falseなら0に切り替え
    //     } else {
    //         // 他のフィールドの処理（titleやcontentsなど）
    //         newValue = e.target.value;
    //     }

    //     const updatedInfo =
    //         genre === "contents"
    //             ? { ...companyInfo, contents: newValue }
    //             : genre === "title"
    //                 ? { ...companyInfo, title: newValue }
    //                 : genre === "public_status"
    //                     ? { ...companyInfo, public_status: newValue }
    //                     : { ...companyInfo }; // その他の場合（エラー処理など）

    //     // セッションストレージを更新する処理（省略）

    //     const currentData = getSessionData("accountData")?.CompanyInformation || [];
    //     const filteredData = currentData.filter(item => item.id !== updatedInfo.id);
    //     const updatedArray = [...filteredData, updatedInfo];

    //     updateSessionData("accountData", "CompanyInformation", updatedArray);
    //     console.log("更新後の企業情報", updatedArray);

    //     // 編集状態を保持
    //     updateSessionData("accountData", "CompanyInformationEditing", true);
    //     setCompanyInfo(updatedArray);
    // };

    return (
        <div>
            <Stack direction="row">
                <TextField
                    margin="normal"
                    name="CompanyInformationTitle"
                    onChange={(e) => HandleCompanyInformationChange(e, "title",info.id)}
                    value={info.title}
                    variant="outlined"
                    multiline
                    sx={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        marginTop: '6px',
                        marginBottom: '0',
                    }}
                    InputProps={{
                        className: 'MyPageEditTitles',
                    }}
                />

                <div className="CompanyInformation_Options">
                    <Tooltip title={info.public_status === 1 ? "公開状態を切り替えます 現在:公開中" : "公開状態を切り替える 現在:非公開中"}>
                        <Switch
                            checked={info.public_status === 1}
                            onChange={() => HandleChangePublicStatus(info.id)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Tooltip>
                    <Tooltip title={"開いているフォームを削除します"}>
                        <IconButton onClick={() => {
                            console.log("企業情報全体",info);
                            console.log("企業情報配列の中のid",info.id);
                            HandleDeleteRow(info.id)}
                        }>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"次の行に新たにフォームを追加します"}>

                        <IconButton onClick={() => HandleAddRow(info.row_number)}> {/* 列順の番号を渡す */}
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </Stack>

            <TextField
                fullWidth
                margin="normal"
                name="CompanyInformationContents"
                onChange={(e) => HandleCompanyInformationChange(e, "contents",info.id)}
                value={info.contents}
                variant="outlined"
                multiline
                sx={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    marginTop: '6px',
                    marginBottom: '0',
                }}
                InputProps={{
                    className: 'MyPageEditItems',
                }}
            />
        </div>
    );
};

CompanyInformation.propTypes = {
    info: PropTypes.shape({
        id: PropTypes.number.isRequired,
        company_id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        contents: PropTypes.string.isRequired,
        public_status:PropTypes.number,
        row_number: PropTypes.number,
    }).isRequired,
    HandleAddRow:PropTypes.func.isRequired,
    HandleDeleteRow:PropTypes.func.isRequired,
    HandleChangePublicStatus:PropTypes.func.isRequired,
    HandleCompanyInformationChange:PropTypes.func.isRequired
};

export default CompanyInformation;
