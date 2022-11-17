import { Button, Stack } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { Pages, PageKeys, pageList, PagesType } from '../utils/Pages'

const Menu: React.FC = () => {
	const [displayType, setDisplayType] = useState<PageKeys>("page1");
	const [switchButton, setSwitchButton] = useState<boolean>(false);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		//現在のpathnameから、ページ名を取得
		const currentPage = Object.values(Pages).find(
			(page) => page.path === location.pathname
		);
		if (currentPage != null) {
			setDisplayType(currentPage.name);
		}
	}, [location.pathname]);

	/**
	 * ページボタン 押下時
	 */
	const onClickPageButton = useCallback((page: PagesType) => {
		setDisplayType(page.name);
		navigate(page.path);
	}, [navigate]);

	/**
	 * 自動切換えボタン 押下時
	 */
	const onClickSwitchButton = useCallback(() => {
		setSwitchButton(!switchButton);
	}, [switchButton]);


	useEffect(() => {
		// 動作停止
		if (!switchButton) {
			return;
		}
		let currentPage = displayType;
		const interval = setInterval(() => {
			//現在のページのindexを取得
			const index = pageList.findIndex((page) => page === currentPage);
			//次のページのindexを取得
			//indexが末尾になったら０に戻る、そうでない場合は１ずつ進む
			const next = index === pageList.length - 1 ? 0 : index + 1;
			//現在のページ（key）を更新
			currentPage = pageList[next];
			//現在のkeyからpathを取得し、ページを更新する。
			const nextPath = Pages[currentPage].path;
			//次のページへ遷移
			navigate(nextPath);
		}, 30000);//１秒で指定
		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [switchButton]);


	return (
		<Stack direction="column" width={200} >
			{Object.values(Pages).map((page) => {
				return (
					<Button
						onClick={() => onClickPageButton(page)}
						variant={page.name === displayType ? "contained" : "text"}
					>
						{page.name}
					</Button>
				)
			})}
			<Button onClick={onClickSwitchButton} variant={switchButton ? "contained" : "text"}>
				メニュー自動切り替え
			</Button>
		</Stack>
	)
}

export default Menu