export const Pages = {
	page1: {
		name: "page1",
		path: "/page1"
	},
	page2: {
		name: "page2",
		path: "/page2"
	},
	page3: {
		name: "page3",
		path: "/page3"
	}
} as const;

//Pagesの型を取得
export type PagesType = typeof Pages[keyof typeof Pages];
//Pagesのkeyの型を取得
export type PageKeys = keyof typeof Pages;
//Pagesの型のkeyのみのリストを作成
export const pageList = Object.keys(Pages) as Array<PageKeys>;